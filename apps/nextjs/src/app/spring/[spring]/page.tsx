"use client";

import React from "react";
import MapDisplay from "~/components/MapDisplay";
import SpringDetails from "~/components/SpringDetails";
import slugify from "slugify";
import { api } from "~/trpc/react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    spring: string;
  };
}

const page = (props: Props) => {
  const springs = api.spring.findAllSprings.useQuery();

  let available = false;
  !springs.isLoading &&
    springs.data?.map((spring) => {
      if (slugify(spring.name, { lower: true }) === props.params.spring) {
        available = true;
        console.log(slugify(spring.name, { lower: true }));
        // springNow = spring;
      }
    });

  if (props.params.spring == "alagar-hills-springshed") available = true;

  if (!available) {
    return (
      // <div className="h-full w-full flex justify-center items-center">
      //   <p>
      //     This springshed has not been mapped yet.
      //   </p>
      // </div>
      notFound()
    );
  }

  if (props.params.spring != "alagar-hills-springshed") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>This springshed has not been mapped yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="inline-block w-full bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-10 text-center text-4xl font-extrabold text-transparent">
        Alagar Hills
      </div>
      <div className="mx-2 md:mx-12 my-8">
        <p className="hidden items-center text-center subpixel-antialiased md:flex lg:leading-8">
          Alagarkoil is comprised of three temples, one of which is up a steep
          flight of steps on the side of a hill, and the others some distance
          away from the base of the hill. The temples are about 20 km outside of
          Madurai and are dedicated to Murugan, the second son of Shiva and a
          prominent god in southern India. Goddess Rakkayi temple is up a long
          flight of steps with many monkeys hanging around. When you take off
          your shoes to enter the temple make sure to leave your socks with your
          shoes. It&apos;s a place of washing in the natural spring water for the
          purpose of purification and it&apos;s wet inside.
        </p>
        <p className="flex items-center text-center text-sm subpixel-antialiased md:hidden">
          Alagarkoil is comprised of three temples, one of which is up a steep
          flight of steps on the side of a hill, and the others some distance
          away from the base of the hill. It&apos;s a place of washing in the natural
          spring water for the purpose of purification and it&apos;s wet inside.
        </p>
      </div>
      <div className="hidden w-full lg:flex">
        {/* <WeatherStation /> */}
      </div>

      <div className="my-10 mx-2 md:mx-10 flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <MapDisplay />
          {/* <ForecastData /> */}
        </div>
        <div className="w-full space-y-2 md:w-1/2">
          {/* <SelectMapType /> */}
          <SpringDetails />
        </div>
      </div>
      <div className="h-screen">
        {/* <SpringAreaChart />
      <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: "3823ef74-83f0-4100-89c3-5db63d6ec0c0",
              embedUrl:
                "https://app.powerbi.com/reportEmbed?reportId=3823ef74-83f0-4100-89c3-5db63d6ec0c0&groupId=6a8de138-6fda-4397-a49d-b41736e2b3a4&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d",
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSIsImtpZCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjZjMmJmNmEtMDkxNC00MmNkLTlhNzctZjhkMDAyMmFjYjgyLyIsImlhdCI6MTcwMjk2Njk0MiwibmJmIjoxNzAyOTY2OTQyLCJleHAiOjE3MDI5NzE0NjcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VkFBQUFhY243RWcwSk1VWEZadzFBakY0U2FWbXdZSFF3ckV0eHhaOW9sbTh3TVB1ZnR5R1JMMUtPOUVJUE5od05WcmlmIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU0FLVEhJVkVMIiwiZ2l2ZW5fbmFtZSI6IlRIQU5JU0giLCJpcGFkZHIiOiIxMDMuMTgyLjEyMC4yNTAiLCJuYW1lIjoiVEhBTklTSCBTQUtUSElWRUwiLCJvaWQiOiJiOTY0MzExYy02OTk2LTRkNWUtOWM1OC0xZGZiNDE4MWRlYTgiLCJwdWlkIjoiMTAwMzIwMDMyQjI0NUE4NiIsInJoIjoiMC5BVDBBYXJfQ3RoUUp6VUthZF9qUUFpckxnZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQ2hBUHcuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUVZFYXdwbnVaZFBWcVJNWmM3RmR3QjVkTFhiRjJ4YV9LWDJrUmNsTWN5ayIsInRpZCI6ImI2YzJiZjZhLTA5MTQtNDJjZC05YTc3LWY4ZDAwMjJhY2I4MiIsInVuaXF1ZV9uYW1lIjoiVEhBTklTSFNBS1RISVZFTEBkYXRzODExLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IlRIQU5JU0hTQUtUSElWRUxAZGF0czgxMS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJoZnN2OGZhTWVrQ0kzS1JWeDQ2MUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3BsIjoiZW4ifQ.GIMUGSrUUvFeOjFsB9VEA4F8N4fMFyodA3eEmYwIjzqk08vA7FP_PkwFKEQd12FlXdckTVOin6fGrCJ1wL01Hkj-opjZYKgVLzRBY1r6HkH_1tAXVC1qbQzVSrvoMiNvD9aNtwJ95uTol3LrzQQhedeG1Mb6KrahBVNFlAwITfGQ4jjUH83hIzld6MYouV2JqJwxjKPX98OkEetd-VmIOqiR2NCwapwTf3W0JrpFZ0NL7V4GpWNqJ1_r43wR3f38HY8RANlxmycNguro8ehauaVpLOZsqj8wV1qx77RahZRh_olCv77TbrXvABP0N-3Q0rAntpWCipxOBLYheAeeHg",
              tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                // [
                //   "rendered",
                //   function () {
                //     console.log("Report rendered");
                //   },
                // ],
                // [
                //   "error",
                //   function (event) {
                //     console.log(event?.detail);
                //   },
                // ],
                // ["visualClicked", () => console.log("visual clicked")],
                // ["pageChanged", (event) => console.log(event)],
              ])
            }
            cssClassName={"report-container"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport as Report; // 
            }}
          /> */}
      </div>
    </div>
  );
};

export default page;
