import { Button, Flex, Title } from '@mantine/core'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
    >
      <Title>Improving my padel. One game at a time.</Title>

      <Button
        variant="subtle"
        color="violet"
        mt={12}
        component={Link}
        to="/matches"
        rightIcon={<ArrowRightIcon />}
      >
        View all matches
      </Button>
    </Flex>
  )
}
