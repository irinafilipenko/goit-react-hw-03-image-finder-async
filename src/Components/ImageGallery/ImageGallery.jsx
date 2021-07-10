import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

// export const CountryList = ({ countries }) => {
//   return (
//     <ul>
//       {countries.map(({ name, flag }) => (
//         <li key={name}>
//           <img src={flag} alt={name} width="24" height="24" />
//           {name}
//         </li>
//       ))}
//     </ul>
//   );

export const ImageGallery = ({ pictures }) => {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          // handleImageClick={this.props.handleImageClick}
        />
      ))}
    </ul>
  )
}
