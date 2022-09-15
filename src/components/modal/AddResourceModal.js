import { useFormContext } from 'react-hook-form'

import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { FileInput2 } from '../input/FileInput2'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddResourceModal = (props) => {
  const {
    visible,
    setVisible,
    counter,
    setCounter,
    isEdit,
    setIsEdit,
    previousResource,
    rowKey,
    resourceType,
    setResourceType
  } = props
  const { register, trigger, watch, setValue, formState: { errors } } = useFormContext()

  const docs = watch('content.docs')
  const doc = watch(`content.docs[doc-${counter}]`)
  let fileName

  if (doc) {
    fileName = Object.keys(doc).map(value => (
      value === 'id' || value === 'title' || value === 'color' || value === 'label'
    ) ? false : value).filter(value => value).join()
  }

  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        if (!isEdit) {
          setValue(`content.docs[doc-${counter}].title`, '')
          // 
        } else {
          if (
            previousResource.title !== docs[`doc-${counter}`]?.title
            || previousResource[fileName][0].name !== docs[`doc-${counter}`][fileName][0].name
          ) {
            // setValue(`content.docs[doc-${counter}].title`, previousResource.title)
            setValue(`content.docs[doc-${counter}]`, previousResource)
          }

          const array = Object.entries(docs)

          if (array.length) {
            const [lastItem] = array[array.length - 1]
            const [, lastItemIndex] = lastItem.split('-')
            setCounter(Number(lastItemIndex))
            setValue(`content.docs[doc-${lastItemIndex}].title`, '')
            // 
          }
          setIsEdit(false)
        }
        setResourceType(undefined)
      }}
    >
      <div style={{ borderBottom: '1px solid #D1D5DB' }}>
        <Section style={{ background: '#fff' }}>
          <h3
            style={{
              margin: 0,
              fontWeight: 'var(--bold-font-weight)',
              fontSize: '.9rem',
              color: 'var(--main-font-color)',
            }}
          >Adição de Recursos</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Input label='Título' style={{ paddingLeft: 0, paddingRight: 0 }} required
          error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.title?.message}
        >
          <input type='text' id='Título'
            {...register(`content.docs[doc-${counter}].title`, {
              required: {
                value: visible,
                message: 'This field is required'
              }
            })}
          />
        </Input>

        {(resourceType?.label === 'URL / Link' || doc?.label === 'URL / Link') &&
          (
            <Input label='URL / Link' style={{ paddingLeft: 0, paddingRight: 0 }} required
              error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.url?.message}
            >
              <input type='url' id='URL / Link' placeholder='https://example.com'
                {...register(`content.docs[doc-${counter}].url`, {
                  required: {
                    value: visible,
                    message: 'This field is required'
                  },
                  pattern: {
                    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    message: 'Please provide a valid URL, (Example: https://example.com)'
                  }
                })}
              />
            </Input>
          )}

        {(resourceType?.label === 'Documento em PDF') && (
          <Input label='PDF' style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.pdf?.message}
          >
            <input
              type='file' id='PDF'
              {...register(`content.docs[doc-${counter}].pdf`, {
                required: {
                  value: !isEdit,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.pdf$/i
                      // setValue(`team.${counter}.image.imageName`, value[0].name)
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </Input>
        )}

        {(isEdit && doc?.label === 'Documento em PDF') && (
          <FileInput2 label='PDF'
            style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors.content?.docs?.[`doc-${counter}`]?.pdf?.message}
            fileName={Object.keys(doc).includes('pdf') ? doc.pdf[0].name : 'Nenhum ficheiro selecionado.'}
          >
            <input id='PDF' type='file' style={{ display: 'none' }}
              {...register(`content.docs[doc-${counter}].pdf`, {
                required: {
                  value: !isEdit,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.pdf$/i
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </FileInput2>
        )}

        {(resourceType?.label === 'Documento em WORD') && (
          <Input label='Documento em WORD' style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.word?.message}
          >
            <input
              type='file'
              id='Documento em WORD'
              {...register(`content.docs[doc-${counter}].word`, {
                required: {
                  value: visible,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.doc|\.docx|\.docm|\.dot|\.dotm|\.dotx|\.odt|\.wps$/i
                      // setValue(`team.${counter}.image.imageName`, value[0].name)
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </Input>
        )}


        {(isEdit && doc?.label === 'Documento em WORD') && (
          <FileInput2 label='Documento em WORD'
            style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors.content?.docs?.[`doc-${counter}`]?.word?.message}
            fileName={Object.keys(doc).includes('word') ? doc.word[0].name : 'Nenhum ficheiro selecionado.'}
          >
            <input id='Documento em WORD' type='file' style={{ display: 'none' }}
              {...register(`content.docs[doc-${counter}].word`, {
                required: {
                  value: !isEdit,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.doc|\.docx|\.docm|\.dot|\.dotm|\.dotx|\.odt|\.wps$/i
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </FileInput2>
        )}


        {(resourceType?.label === 'Documento em Excel') && (
          <Input label='Documento em Excel' style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.excel?.message}
          >
            <input
              type='file'
              id='Documento em Excel'
              {...register(`content.docs[doc-${counter}].excel`, {
                required: {
                  value: visible,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.xlsx|\.xlsm|\.xlsb|\.xltx|\.xltm|\.xls|\.xlt|\.xml|\.xlam|\.xla|\.xlw|\.xlr$/i
                      // setValue(`team.${counter}.image.imageName`, value[0].name)
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </Input>
        )}

        {(isEdit && doc?.label === 'Documento em Excel') && (
          <FileInput2 label='Documento em Excel'
            style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors.content?.docs?.[`doc-${counter}`]?.excel?.message}
            fileName={Object.keys(doc).includes('excel') ? doc.excel[0].name : 'Nenhum ficheiro selecionado.'}
          >
            <input id='Documento em Excel' type='file' style={{ display: 'none' }}
              {...register(`content.docs[doc-${counter}].excel`, {
                required: {
                  value: !isEdit,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.xlsx|\.xlsm|\.xlsb|\.xltx|\.xltm|\.xls|\.xlt|\.xml|\.xlam|\.xla|\.xlw|\.xlr$/i
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </FileInput2>
        )}

        {(resourceType?.label === 'Documento em Powerpoint') && (
          <Input label='Documento em Powerpoint' style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors?.content?.docs[`doc-${counter}`]?.powerpoint?.message}
          >
            <input
              type='file'
              id='Documento em Powerpoint'
              {...register(`content.docs[doc-${counter}].powerpoint`, {
                required: {
                  value: visible,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.pptx|\.pptm|\.ppt|\.potx|\.potm|\.pot|\.ppsx|\.ppsm|\.pps|\.ppam|\.ppa|\.odp$/i
                      // setValue(`team.${counter}.image.imageName`, value[0].name)
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </Input>
        )}

        {(isEdit && doc?.label === 'Documento em Powerpoint') && (
          <FileInput2 label='Documento em Powerpoint'
            style={{ paddingLeft: 0, paddingRight: 0 }} required
            error={errors?.content?.docs && errors.content?.docs?.[`doc-${counter}`]?.powerpoint?.message}
            fileName={Object.keys(doc).includes('powerpoint') ? doc.powerpoint[0].name : 'Nenhum ficheiro selecionado.'}
          >
            <input id='Documento em Powerpoint' type='file' style={{ display: 'none' }}
              {...register(`content.docs[doc-${counter}].powerpoint`, {
                required: {
                  value: !isEdit,
                  message: 'This field is required'
                },
                validate: (value) => {
                  if (!!value) {
                    if (typeof value !== 'string') {
                      const allowedExtensions = /\.pptx|\.pptm|\.ppt|\.potx|\.potm|\.pot|\.ppsx|\.ppsm|\.pps|\.ppam|\.ppa|\.odp$/i
                      return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                    }
                  }
                }
              })}
            />
          </FileInput2>
        )}

        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button
              type='button'
              onClick={async () => {
                const canSave = await trigger([
                  `content.docs[doc-${counter}].title`,
                  `content.docs[doc-${counter}].url`,
                  `content.docs[doc-${counter}].pdf`,
                  `content.docs[doc-${counter}].word`,
                  `content.docs[doc-${counter}].excel`,
                  `content.docs[doc-${counter}].powerpoint`
                ], {
                  shouldFocus: true
                })

                console.log('can save', canSave)

                if (canSave) {
                  if (isEdit) {
                    const array = Object.entries(docs)

                    if (array.length) {
                      const [lastItem] = array[array.length - 1]
                      const [, lastItemIndex] = lastItem.split('-')
                      setCounter(Number(lastItemIndex))
                      setValue(`content.docs[doc-${lastItemIndex}].title`, '')
                      // 
                      // 
                    }
                    setIsEdit(false)
                  } else {
                    setValue(`content.docs[doc-${counter}].owner`, rowKey)
                    setValue(`content.docs[doc-${counter}].color`, resourceType.color)
                    setValue(`content.docs[doc-${counter}].label`, resourceType.label)

                    setCounter(prev => prev + 1)
                    // setValue(`content.docs[doc-${Object.entries(docs).length}].title`, '')
                    // 
                  }
                  setResourceType(undefined)
                  setVisible()
                }
              }}
            >Salvar</button>
          </Input>
          <Input
            style={{
              display: 'inline-block',
              float: 'right',
              '--bg-color': 'rgb(252, 88, 50)',
              '--bg-hover': 'rgb(252, 70, 29)',
              '--bg-active': 'rgb(252, 88, 50)',
              '--outline-color': 'rgb(253, 152, 129)',
            }}
          >
            <button type='button'
              onClick={() => {
                setVisible()
                if (!isEdit) {
                  setValue(`content.docs[doc-${counter}].title`, '')
                  // 
                } else {
                  if (
                    previousResource.title !== docs[`doc-${counter}`]?.title
                    || previousResource[fileName][0].name !== docs[`doc-${counter}`][fileName][0].name
                  ) {
                    // setValue(`content.docs[doc-${counter}].title`, previousResource.title)
                    setValue(`content.docs[doc-${counter}]`, previousResource)
                  }

                  const array = Object.entries(docs)

                  if (array.length) {
                    const [lastItem] = array[array.length - 1]
                    const [, lastItemIndex] = lastItem.split('-')
                    setCounter(Number(lastItemIndex))
                    setValue(`content.docs[doc-${lastItemIndex}].title`, '')
                    // 
                  }

                  setIsEdit(false)

                  // setCounter(Object.entries(docs).length - 1)
                  // setValue(`content.docs[doc-${Object.entries(docs).length - 1}].title`, '')
                  // setIsEdit(false)
                }
                setResourceType(undefined)
              }}
            >Cancelar</button>
          </Input>
        </Row>
      </Section>
    </DialogOverlay>
  )
}
