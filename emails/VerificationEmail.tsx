import { Html, Head, Preview, Heading, Row, Section, Text } from "@react-email/components";

interface VerificationEmailProps {
    userName: string;
    otp: string;
}

export default function VerificationEmail({ userName, otp }: VerificationEmailProps) {
    return (
        <Html>
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Helo {userName},</Heading>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
            </Section>
        </Html>
    )
}

