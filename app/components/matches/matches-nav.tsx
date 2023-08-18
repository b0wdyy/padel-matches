import { Box, Container, Flex, Button } from '@mantine/core'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

export const MatchesNav: React.FC = () => {
  return (
    <Box component="nav" p="lg">
      <Container>
        <Flex justify="space-between" align="center">
          <Box
            display="flex"
            sx={{
              alignItems: 'center',
              gap: '0.5rem',
            }}
            component={Link}
            to="/matches"
          >
            <ArrowLeftIcon />
            Back to overview
          </Box>

          <Button
            component={Link}
            to="/matches/new"
            variant="outline"
            color="gray"
          >
            Add match
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
