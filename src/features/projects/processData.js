export const processArray = async (team) => {
  const newTeam = team
    .map(value => value.name && value.role && value.image ? value : null)
    .filter(value => value)

  const promises = []

  newTeam.forEach(value => {
    promises.push(convert2base64(value.image))
  })

  return await Promise.all(promises)
}

export const convert2base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result.toString())
    }
    reader.readAsDataURL(file)
  })
}

///////////////////////////////////////////////
export const processArray2 = async (team) => {
  const newTeam = team
    .map(value => value.name && value.role && value.image ? value : null)
    .filter(value => value)

  const promises = []

  newTeam.forEach(value => {
    if (value.image.name) {
      promises.push(convert2base64(value.image))
    } else {
      promises.push(value.image)
    }
  })

  return await Promise.all(promises)
}

