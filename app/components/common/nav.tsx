import { Box, Container, Flex, Text } from '@mantine/core'
import { Link } from '@remix-run/react'

export const Nav: React.FC = () => {
  return (
    <Box component="nav" p="lg">
      <Container>
        <Flex justify="center" align="center">
          <Text
            component={Link}
            to="/"
            transform="uppercase"
            size="xl"
            sx={{
              letterSpacing: '0.2em',
            }}
          >
            Padel reviews
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
