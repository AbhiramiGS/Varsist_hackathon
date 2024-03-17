#include <DebugMacros.h>
#include <HTTPSRedirect.h>

//PH_PIN=33__4.55V,ESP32=3.1(4095)
//TEMP=32
//TDS=35_0-1000PPM_0-2.3V(3038)
//TURBIDITY=34_0-3000NTU_0-3.3V(4095)
//DO_PIN 36
//Free_pin 39

#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <TinyGPS.h>
#include <IOXhop_FirebaseESP32.h>
// #include "HTTPSRedirect.h"
// #include "DebugMacros.h"
#include <Arduino.h>

#include <time.h>
 

#define FIREBASE_HOST "https://springsense-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define FIREBASE_AUTH "2vyRYJ6GhQcqJIubBOi9u16uS99vpVifOxn0qV4q"
#define WIFI_SSID "realme 7i"
#define WIFI_PASSWORD ""

#define DO_PIN 36
#define VREF 3300    //VREF (mv)
#define ADC_RES 4096 //ADC Resolution
#define TWO_POINT_CALIBRATION 0
#define READ_TEMP (29) //Current water temperature ℃, Or temperature sensor function
#define CAL1_V (490) //mv
#define CAL1_T (29)   //℃
#define CAL2_V (1300) //mv
#define CAL2_T (15)   //℃

const uint16_t DO_Table[41] = {
    14460, 14220, 13820, 13440, 13090, 12740, 12420, 12110, 11810, 11530,
    11260, 11010, 10770, 10530, 10300, 10080, 9860, 9660, 9460, 9270,
    9080, 8900, 8730, 8570, 8410, 8250, 8110, 7960, 7820, 7690,
    7560, 7430, 7300, 7180, 7070, 6950, 6840, 6730, 6630, 6530, 6410};
 
uint8_t Temperaturet;
uint16_t ADC_Raw;
uint16_t ADC_Voltage;
 
int16_t readDO(uint32_t voltage_mv, uint8_t temperature_c)
{
#if TWO_POINT_CALIBRATION == 00
  uint16_t V_saturation = (uint32_t)CAL1_V + (uint32_t)35 * temperature_c - (uint32_t)CAL1_T * 35;
  return (voltage_mv * DO_Table[temperature_c] / V_saturation);
#else
  uint16_t V_saturation = (int16_t)((int8_t)temperature_c - CAL2_T) * ((uint16_t)CAL1_V - CAL2_V) / ((uint8_t)CAL1_T - CAL2_T) + CAL2_V;
  return (voltage_mv * DO_Table[temperature_c] / V_saturation);
#endif
}

float flat, flon, flat_tr, flon_tr;
float TURBIDITY_val;
float TDS_val;
float temperatureC;
float temperatureF;
float PH_val;

const char* host = "script.google.com";
const char* GScriptId = "AKfycbzkzTvq6GEjzpPATP_npj1fESANtnaXTbmScQP1fDN63GCIWhaNUSA3gqOyfrU9mFyK"; // Replace with your own google script id
const int httpsPort = 443; //the https port is same

String url = String("/macros/s/") + GScriptId + "/exec?Lattitude=" + flat + "&Longitude=" + flon + "&TURBIDITY=" + TURBIDITY_val + "&TDS=" + TDS_val + "&TEMPERATURE=" + temperatureC + "&PH=" + PH_val;  // Write to Cell A continuosly
String payload = "";
HTTPSRedirect* client = nullptr;


//TEMP
// GPIO where the DS18B20 is connected to
const int oneWireBus = 32;
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

//GPS_DATA
TinyGPS gps;
float spd;       //Variable  to store the speed
float sats;      //Variable to store no. of satellites response
String bearing;  //Variable to store orientation or direction of GPS
HardwareSerial GPS(2);
#define RXD2 12
#define TXD2 13

//SLEEP_MODE
#define uS_TO_S_FACTOR 60000000ULL  /* Conversion factor for micro seconds to seconds */
int TIME_TO_SLEEP;            /* Time ESP32 will go to sleep (in seconds) */

unsigned long previousMillis = 0;
const long interval = 2000; // Interval in milliseconds (2 seconds) 

void setup() {
  // Start the Serial Monitor
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  pinMode(2,OUTPUT);
/*  pinMode(33,INPUT);
  pinMode(34,INPUT);
  pinMode(35,INPUT);
  pinMode(32,INPUT);*/
  digitalWrite(2,HIGH);
  delay(1000);
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
//TEMP
  // Start the DS18B20 sensor
  sensors.begin();

//GPS_DATA
  GPS.begin(9600, SERIAL_8N1, RXD2, TXD2);
  Serial.println("Serial Txd is on pin: "+String(TXD2));
  Serial.println("Serial Rxd is on pin: "+String(RXD2));


  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

/*GOOGLE_SHEET
  // Use HTTPSRedirect class to create a new TLS connection
  client = new HTTPSRedirect(httpsPort);
  client->setPrintResponseBody(true);
  client->setContentTypeHeader("application/json");
  Serial.print("Connecting to ");
  Serial.println(host);          //try to connect with "script.google.com"
  // Try to connect for a maximum of 5 times then exit
  bool flag = false;
  for (int i = 0; i < 5; i++) {
    int retval = client->connect(host, httpsPort);
    if (retval == 1) {
      flag = true;
      break;
    }
    else
      Serial.println("Connection failed. Retrying...");
  }
  if (!flag) {
    Serial.print("Could not connect to server: ");
    Serial.println(host);
    Serial.println("Exiting...");
    return;
  }
  delete client;
  client = nullptr;
*/

//SLEEP_MODE
//Increment boot number and print it every reboot
  TIME_TO_SLEEP = Firebase.getString("WaterQualityResearch1/TIME_TO_DL").toInt();
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) + " Minutes");

  configTime(0, 0, "pool.ntp.org");
  setenv("TZ", "IST-5:30", 1);  // Set time zone to IST
}

void loop() {

//GPS_DATA
  bool newData = false;
  unsigned long chars;
  unsigned short sentences, failed;
  // For one second we parse GPS data and report some key values
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
  while (GPS.available()) 
  {
      char c = GPS.read();
      Serial.println("GPS Chars: ");
      Serial.write(c); // uncomment this line if you want to see the GPS data flowing
      if (gps.encode(c)) // Did a new valid sentence come in?
        newData = true;
   }
  }
  if (newData)
  {
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);
    Serial.print("LAT=");
    Serial.print(flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6);
    Serial.print(" LON=");
    Serial.print(flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6);
    Serial.print(" SAT=");
    Serial.print(gps.satellites() == TinyGPS::GPS_INVALID_SATELLITES ? 0 : gps.satellites());
    Serial.print(" PREC=");
    Serial.print(gps.hdop() == TinyGPS::GPS_INVALID_HDOP ? 0 : gps.hdop());
    flat_tr = 10000.0 * flat;
    flon_tr = 10000.0 * flon;
  }
  gps.stats(&chars, &sentences, &failed);
  Serial.print(" CHARS=");
  Serial.print(chars);
  Serial.print(" SENTENCES=");
  Serial.print(sentences);
  Serial.print(" CSUM ERR=");
  Serial.println(failed);
  if (chars == 0) {
    Serial.println("------------------------------------------------------");
    Serial.println("** No characters received from GPS: check wiring **");
    Serial.println("------------------------------------------------------");
  }


//TURBIDITY=34_0-3000NTU0-3.3V(4095)__3000/4095
  Serial.println("");
  TURBIDITY_val = analogRead(34)*0.7326;
  Serial.print(TURBIDITY_val,2);
  //  Serial.print((float)analogRead(34)*0.7326,2);
  Serial.println(" NTU");
  Serial.println("");
//TDS=35_0-1000PPM0-2.3V(3038)_1000/3038
  Serial.println("");
  TDS_val = analogRead(35)*0.3291;
  Serial.print(TDS_val,2);
  //  Serial.print((float)analogRead(35)*0.3291,2);
  Serial.println(" PPM");
  Serial.println("");
//TEMP=32
  sensors.requestTemperatures(); 
  temperatureC = sensors.getTempCByIndex(0);
  temperatureF = sensors.getTempFByIndex(0);
  Serial.print(temperatureC);
  Serial.println("ºC");
  Serial.print(temperatureF);
  Serial.println("ºF");
  delay(1000);
//PH_PIN=33_4.55V,ESP32=3.1(4095)_14/4095
  Serial.println("");
  PH_val = analogRead(33)*0.00342;
  Serial.print(PH_val,2);
  //  Serial.print((float)analogRead(33)*0.00342,2);
  Serial.println(" PH");
  Serial.println("");
//DO_PIN 36
  Temperaturet = (uint8_t)READ_TEMP;
  ADC_Raw = analogRead(DO_PIN);
  ADC_Voltage = uint32_t(VREF) * ADC_Raw / ADC_RES;
  float DO_val = (float(readDO(ADC_Voltage, Temperaturet)))/1000;
  Serial.print("Temperaturet:\t" + String(Temperaturet) + "\t");
  Serial.print("ADC RAW:\t" + String(ADC_Raw) + "\t");
  Serial.print("ADC Voltage:\t" + String(ADC_Voltage) + "\t");
  Serial.println("DO:\t" + String(readDO(ADC_Voltage, Temperaturet)) + "\t");
  Serial.println(DO_val);
  Serial.println(flat_tr);
  Serial.println(flon_tr);

  // Create a timestamp for the current data
  unsigned long currentMillis = millis();
  
  // time_t now;
  // struct tm timeinfo;
  // if (getLocalTime(&timeinfo)) {  
  //   now = mktime(&timeinfo);
  // } else {
  //   now = time(nullptr);
  // }

  // char times[20];
  //   snprintf(timestamp, sizeof(timestamp), "%04d-%02d-%02d %02d:%02d:%02d",
  //            year(now), month(now), day(now), hour(now), minute(now), second(now));
  // String timestamp = String(times)
  time_t now;
  struct tm timeinfo;
  if (getLocalTime(&timeinfo)) {
    now = mktime(&timeinfo);
  } else {
    now = time(nullptr);
  }
    // Access individual time elements
    int year = timeinfo.tm_year + 1900;  // years since 1900
    int month = timeinfo.tm_mon + 1;     // months since January (0-11)
    int day = timeinfo.tm_mday;          // day of the month (1-31)
    int hour = timeinfo.tm_hour;         // hours since midnight (0-23)
    int minute = timeinfo.tm_min;        // minutes after the hour (0-59)
    int second = timeinfo.tm_sec;        // seconds after the minute (0-59)

    // ... (do something with these values)
    char times[20];
    snprintf(times, sizeof(times), "%04d-%02d-%02d %02d:%02d:%02d",
             year, month, day, hour, minute, second);
    String timestamp = String(times);


  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/LATTITUDE", flat_tr);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/LONGITUDE", flon_tr);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/PH", PH_val);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/TEMPERATURE", temperatureC);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/TDS", TDS_val);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/TURBIDITY", TURBIDITY_val);
  Firebase.setFloat("WaterQualityResearch1/" + timestamp + "/DO", DO_val);

  url = String("/macros/s/")+GScriptId+"/exec?Lattitude="+flat_tr + "&Longitude="+flon_tr + "&TURBIDITY="+TURBIDITY_val + "&TDS="+TDS_val + "&TEMPERATURE="+temperatureC + "&PH="+PH_val + "&DO="+DO_val;
  Serial.println(url);
  static bool flag = false;
  if (!flag) {
    client = new HTTPSRedirect(httpsPort);
    flag = true;
    client->setPrintResponseBody(true);
    client->setContentTypeHeader("application/json");
  }
    if (!client->connected()) {
      client->connect(host, httpsPort);
      client->POST(url, host, payload, false);
  }
  delete client;

//SLEEP_MODE
  Serial.println("Going to sleep now");
  Serial.flush();
  esp_deep_sleep_start();
}