import { Component } from 'react'
// import toast, { Toaster } from 'react-hot-toast'
// import { SearchForm } from 'components/SearchForm/SearchForm';
import { SearchBar } from './Components/Searchbar/Searchbar'
import { ImageGallery } from './Components/ImageGallery/ImageGallery'
// import { CountryInfo } from 'components/CountryInfo/CountryInfo'
// import { Spinner } from 'components/Spinner/Spinner'
import { fetchPictures } from './services/pictures-api'
export class App extends Component {
  state = {
    pictureName: null,
    pictures: [],
    Status: 'idle',
    page: 1,
  }

  handleFormSubmit = (pictureName) => {
    this.setState({ pictureName })
  }

  handleNameChange = (pictureName) => {
    this.setState({ pictureName })
  }

  async componentDidUpdate(_, prevState) {
    const { pictureName, page } = this.state
    const shouldFetch =
      prevState.pictureName !== pictureName && pictureName !== ''

    if (shouldFetch) {
      try {
        this.setState({ reqStatus: 'pending', pictures: [], page: 1 })
        const pictures = await fetchPictures(pictureName, page)
        this.setState({ reqStatus: 'resolved' })

        // if (countries.length > 10) {
        //   return toast(
        //     'Too many matches found. Please enter a more specific name.',
        //     { icon: '⚠️' },
        //   )
        // }

        this.setState({ pictures })
      } catch (error) {
        this.setState({ reqStatus: 'rejected' })
        //   toast.error('Oops, there is no country with that name')
      }
    }
  }

  render() {
    const { pictures } = this.state
    // const { countries, reqStatus } = this.state
    // const showCountryList = countries.length >= 2 && countries.length < 10
    // const showCountryInfo = countries.length === 1

    return (
      <div>
        {/* <SearchBox onSearch={this.handleNameChange} /> */}
        <SearchBar onSearch={this.handleFormSubmit} />
        {/* {reqStatus === 'pending' && <Spinner size="40" />}
        {showCountryList && <CountryList countries={countries} />}
      
        {showCountryInfo && <CountryInfo country={countries[0]} />}
        <Toaster position="top-right" /> */}
        {/* <ImageGallery pictures={pictures} /> */}
      </div>
    )
  }
}
