import { useMantineColorScheme, Button } from '@mantine/core'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export const DarkModeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Button
      radius="50%"
      display="flex"
      w={40}
      h={40}
      onClick={() => toggleColorScheme()}
      pos="fixed"
      bottom={32}
      right={32}
      color="violet"
      variant="light"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
