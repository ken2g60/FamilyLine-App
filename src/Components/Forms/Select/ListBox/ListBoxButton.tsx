/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { Listbox } from '@headlessui/react'
import { IOption } from 'Interfaces/forms.interface'

interface IListBoxButton {
  selected?: IOption
  placeholder: string
  placeHolderFont?: any
}

const ListBoxButton: React.FC<IListBoxButton & Record<string, any>> = ({
  selected,
  placeholder,
  placeHolderFont,
  ...rest
}) => {
  return (
    <Listbox.Button
      py={2}
      pl={5}
      pr={10}
      as={Flex}
      w="full"
      rounded="md"
      pos="relative"
      h={{ lg: 24 }}
      justify="center"
      align="center"
      borderWidth={1}
      cursor="pointer"
      _focus={{ boxShadow: '0 0 0 1px #3182ce', borderColor: '#3182ce' }}
      {...rest}
    >
      <Text as="span" isTruncated fontSize="lg">
        {selected ? (
          selected?.name || selected
        ) : (
          <Text color="gray.300" fontSize={placeHolderFont}>
            {placeholder}
          </Text>
        )}
      </Text>
      <Flex
        align="center"
        pos="absolute"
        top={0}
        bottom={0}
        right={0}
        pr={2}
        pointerEvents="none"
      >
        <Icon as={FiChevronDown} boxSize={5} color="gray.400" />
      </Flex>
    </Listbox.Button>
  )
}

export default ListBoxButton
