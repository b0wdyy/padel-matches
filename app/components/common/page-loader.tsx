import { Flex, Loader } from '@mantine/core'

export const PageLoader: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      pos="fixed"
      bg="gray.3"
      top={0}
      sx={{
        zIndex: 9999,
      }}
    >
      <Loader size={64} color="gray.8" />
    </Flex>
  )
}
