import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignaturePad from 'react-signature-pad-wrapper'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldSign: React.FC<{ field: Field }> = ({ field }) => {
  const ref = useRef<any>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (v: string) => {
    dispatch(
      formActions.updateValueByKey({
        key: field.id,
        value: v,
      })
    )
    onClose()
  }

  const openSignModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ref?.current?.fromDataURL(value)
    onOpen()
  }
  return (
    <FormControl isRequired={field.mandatory} isReadOnly={field.readonly}>
      <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
      <Box w="150px" borderWidth="1px" borderColor="gray.200" rounded="lg">
        <Image src={value} w="100%" />
      </Box>
      <Button size="sm" onClick={openSignModal} mt={2}>
        {field.placeholder}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody p={4}>
            <Box borderWidth="1px" borderColor="gray.200" rounded="lg">
              <SignaturePad
                ref={ref}
                options={{ minWidth: 2, maxWidth: 5, penColor: '#000' }}
                redrawOnResize
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => ref.current.clear()}>
              Clear
            </Button>
            <Button onClick={() => handleChange(ref.current.toDataURL())}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  )
}
