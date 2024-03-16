import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
// import { Heading } from "@react-email/heading";
// import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
// import { Row } from "@react-email/row";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface Props {
  quality: string;
  value: number;
  permissibleLimit: string;
  unit: string;
}

const AlertEmail = (props: Props) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>IoT Alert: Spring 2</Preview>
        <Body className="bg-white font-sans dark:bg-zinc-900">
          <Container className="mx-auto my-10 w-full max-w-xl px-3">
            <Section className="">
              <Text className="text-2xl font-bold">There is an anomaly!</Text>
            </Section>
            <Section className="mt-4">
              <Text className="text-xl font-bold">
                {props.quality} is {props.value} {props.unit}, for which
                permissible limit is around {props.permissibleLimit}{" "}
                {props.unit}.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default AlertEmail;