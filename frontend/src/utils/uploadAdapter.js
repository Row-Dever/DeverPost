import { imgInstance, instance } from '../api/axiosBase'

const customUploadAdapter = (loader) => {
  return {
    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData()
        loader.file.then((file) => {
          data.append('name', file.name)
          data.append('file', file)

          imgInstance
            .post('/image/upload', data)
            .then((res) => {
              resolve({
                default: `${instance.getUri()}/${res.data.data.filename}`
              })
            })
            .catch((err) => reject(err))
        })
      })
    }
  }
}

const uploadPlugin = function (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return customUploadAdapter(loader)
  }
}

export default uploadPlugin
