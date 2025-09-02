import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Grid,
  Box,
  ThemeIcon,
  List,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  IconApi,
  IconCode,
  IconSearch,
  IconShield,
  IconRocket,
  IconArrowRight,
  IconFileText,
} from "@tabler/icons-react";

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Features Section */}
      <Container size="lg" py="xl">
        <Stack gap="xl" mt="xl">
          <Box ta="center">
            <Title order={2} size="2.5rem" c="blue.6" mb="md">
              Why Use the FitSM API?
            </Title>
            <Text size="lg" c="gray.6" maw={600} mx="auto">
              Built for developers who need reliable access to IT Service
              Management standards
            </Text>
          </Box>

          <Grid mt="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="md" padding="xl" radius="md" h="100%">
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color="brand"
                  mb="md"
                >
                  <IconShield size={30} />
                </ThemeIcon>
                <Title order={3} mb="md" c="blue.8">
                  Standards Compliant
                </Title>
                <Text c="gray.6">
                  Full implementation of the FitSM v3.0 standard with
                  comprehensive vocabulary and term relationships maintained by
                  IT service management experts.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="md" padding="xl" radius="md" h="100%">
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color="blue"
                  mb="md"
                >
                  <IconCode size={30} />
                </ThemeIcon>
                <Title order={3} mb="md" c="blue.8">
                  Developer Friendly
                </Title>
                <Text c="gray.6">
                  RESTful API design with comprehensive OpenAPI documentation,
                  TypeScript definitions, and easy integration patterns.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="md" padding="xl" radius="md" h="100%">
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color="gray"
                  mb="md"
                >
                  <IconRocket size={30} />
                </ThemeIcon>
                <Title order={3} mb="md" c="blue.8">
                  Production Ready
                </Title>
                <Text c="gray.6">
                  Deployed on Cloudflare Workers with global edge distribution,
                  99.9% uptime SLA, and built-in rate limiting.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      {/* API Overview Section */}
      <Box bg="gray.0" py="xl">
        <Container size="lg">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <Title order={2} c="blue.6">
                  Simple, Powerful API
                </Title>
                <Text c="gray.6" size="lg">
                  Access FitSM vocabulary with clean, intuitive endpoints
                  designed for modern applications.
                </Text>

                <List
                  spacing="md"
                  size="md"
                  center
                  icon={
                    <ThemeIcon color="brand" size={20} radius="xl">
                      <IconArrowRight size={12} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>
                    <Text>
                      <strong>Browse all terms</strong> - GET /v1/terms/all
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text>
                      <strong>Get specific terms</strong> - GET
                      /v1/terms/activity
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text>
                      <strong>Search vocabulary</strong> - GET
                      /v1/search?q=process
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text>
                      <strong>Explore relationships</strong> - GET
                      /v1/terms/activity/relationships
                    </Text>
                  </List.Item>
                </List>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="md" padding="xl" radius="md" bg="blue.9" c="white">
                <Text size="sm" c="gray.3" mb="sm">
                  Example Response
                </Text>
                <Box
                  style={{
                    background: "#0C1932",
                    borderRadius: "8px",
                    padding: "20px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    overflow: "auto",
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                    {`{
  "id": 1,
  "term": "Activity",
  "slug": "activity",
  "number": "6.1",
  "definition": "Set of actions carried out within a process",
  "broader": ["process"],
  "related": ["task", "workflow"]
}`}
                  </pre>
                </Box>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="lg" py="xl">
        <Card shadow="lg" padding="xl" radius="md" bg="brand.0">
          <Stack align="center" gap="lg">
            <ThemeIcon size={60} radius="md" color="brand">
              <IconApi size={35} />
            </ThemeIcon>

            <Title order={2} ta="center" c="blue.8">
              Ready to get started?
            </Title>

            <Text ta="center" size="lg" c="gray.6" maw={500}>
              Explore the complete FitSM vocabulary or dive into our
              comprehensive API documentation.
            </Text>

            <Group gap="md">
              <Button
                component={Link}
                to="/terms"
                size="lg"
                color="brand"
                rightSection={<IconSearch size={18} />}
              >
                Browse Terms
              </Button>
              <Button
                component="a"
                href="/docs"
                size="lg"
                variant="outline"
                color="blue"
                rightSection={<IconFileText size={18} />}
              >
                View API Docs
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>

      {/* Footer */}
      <Box bg="blue.9" c="white" py="lg">
        <Container size="lg">
          <Divider mb="lg" color="blue.7" />
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={4} mb="md" c="brand.4">
                FitSM.dev
              </Title>
              <Text c="gray.4" size="sm">
                Making IT Service Management standards accessible through modern
                APIs. Built with TypeScript, validated with Zod, deployed on
                Cloudflare Workers.
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group justify="flex-end" gap="xl">
                <Stack gap="xs">
                  <Text size="sm" fw={500} c="white">
                    Resources
                  </Text>
                  <Anchor href="/docs" c="gray.4" size="sm">
                    API Documentation
                  </Anchor>
                  <Anchor href="/api/openapi.json" c="gray.4" size="sm">
                    OpenAPI Spec
                  </Anchor>
                </Stack>

                <Stack gap="xs">
                  <Text size="sm" fw={500} c="white">
                    Standard
                  </Text>
                  <Text c="gray.4" size="sm">
                    FitSM v3.0-2
                  </Text>
                  <Anchor
                    href="https://creativecommons.org/licenses/by/4.0/"
                    c="gray.4"
                    size="sm"
                  >
                    CC BY 4.0
                  </Anchor>
                </Stack>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Add floating animation styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-1deg); }
          }
        `}
      </style>
    </>
  );
};

export default LandingPage;
