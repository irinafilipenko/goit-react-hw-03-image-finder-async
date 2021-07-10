import { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { onErrorToast } from './Components/ToastError'
// import { SearchForm } from 'components/SearchForm/SearchForm';
import { SearchBar } from './Components/Searchbar/Searchbar'
import { ImageGallery } from './Components/ImageGallery/ImageGallery'
// import { CountryInfo } from 'components/CountryInfo/CountryInfo'
// import { Spinner } from 'components/Spinner/Spinner'
import { fetchPictures } from './services/pictures-api'
import Button from './Components/Button/Button'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export class App extends Component {
  state = {
    pictureName: null,
    pictures: [],
    Status: Status.IDLE,
    page: 1,
  }

  handleFormSubmit = (pictureName) => {
    if (pictureName.trim() === '') {
      onErrorToast()

      return
    }
    this.setState({ pictureName })
  }

  handleNameChange = (pictureName) => {
    this.setState({ pictureName })
  }

  scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }

  onLoadMoreBtn = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      // status: Status.RESOLVED,
    }))
  }

  async onFetchPictures() {
    const { pictureName, page } = this.state
    try {
      const pictures = await fetchPictures(pictureName, page)

      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...pictures],
        page: this.state.page,
        status: Status.RESOLVED,
      }))
    } catch (error) {
      this.setState({ Status: Status.REJECTED })
      onErrorToast()
    }
  }

  componentDidUpdate(_, prevState) {
    const { pictureName, page } = this.state
    const shouldFetch =
      prevState.pictureName !== pictureName && pictureName !== ''
    console.log('prev', prevState.pictureName)
    console.log('next', pictureName)

    if (shouldFetch) {
      this.setState({ status: Status.PENDING, page: 1, pictures: [] })
      this.onFetchPictures()
    }
    if (prevState.page !== this.state.page) {
      console.log('hi')
      this.onFetchPictures()
    }
  }

  render() {
    const { pictures, Status } = this.state
    // const { countries, reqStatus } = this.state
    // const showCountryList = countries.length >= 2 && countries.length < 10
    // const showCountryInfo = countries.length === 1
    const showImageList = pictures.length > 0

    return (
      <div>
        <ToastContainer autoClose={4000} />

        <SearchBar onSearch={this.handleFormSubmit} />

        <ImageGallery pictures={pictures} />
        {showImageList && (
          <Button onClick={this.onLoadMoreBtn} aria-label="add contact" />
        )}
      </div>
    )
  }
}
