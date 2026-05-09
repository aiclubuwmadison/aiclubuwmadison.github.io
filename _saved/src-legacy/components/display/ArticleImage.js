// import React, { useState, useEffect } from 'react';
// import BodyText from '../typographic/BodyText';

// const ArticleImage = ({ files, captions }) => {
//   // Normalize files into an array.
//   const filesArray = Array.isArray(files) ? files : files ? [files] : [];
//   const numImages = filesArray.length;
//   const hasMultiple = numImages > 1;

//   // Always call hooks unconditionally.
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleNext = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentImageIndex((prev) => (prev + 1) % numImages);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   const handlePrevious = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentImageIndex((prev) => (prev - 1 + numImages) % numImages);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   useEffect(() => {
//     if (hasMultiple) {
//       const intervalId = setInterval(handleNext, 3000);
//       return () => clearInterval(intervalId);
//     }
//   }, [hasMultiple, numImages, isAnimating]);

//   // Dynamic container styling for a polished look.
//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: '800px',
//     margin: '20px auto',
//     background: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   };

//   // Carousel container: vertically center the content.
//   const carouselContainerStyle = {
//     position: 'relative',
//     width: '100%',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//   };

//   // Image carousel: arrange items horizontally.
//   const imageCarouselStyle = {
//     display: 'flex',
//     transition: 'transform 0.5s ease-in-out',
//     transform: `translateX(-${currentImageIndex * 100}%)`,
//   };

//   // Each carousel item takes up 100% of the container's width.
//   const carouselItemStyle = {
//     flex: '0 0 100%',
//   };

//   // Style for left/right arrows.
//   const arrowStyle = {
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     zIndex: 1,
//     background: 'rgba(0, 0, 0, 0.5)',
//     color: '#fff',
//     border: 'none',
//     padding: '20px 12px', // Adjust width and height if needed
//     borderRadius: '4px', // Set to 0 for a pure box
//     cursor: 'pointer',
//   };
  
//   const arrowLeftStyle = {
//     ...arrowStyle,
//     left: '10px',
//   };

//   const arrowRightStyle = {
//     ...arrowStyle,
//     right: '10px',
//   };

//   return (
//     <>
//       {numImages === 0 ? null : !hasMultiple ? (
//         // Single image: use your legacy class names with the dynamic container style.
//         <div className="image-container" style={containerStyle}>
//           <div className="image">
//             <img
//               src={`${process.env.PUBLIC_URL}/images/events/${filesArray[0]}`}
//               width="100%"
//               alt={Array.isArray(captions) ? captions[0] : captions}
//             />
//             <div className="image-caption">
//               <BodyText>
//                 {Array.isArray(captions) ? captions[0] : captions}
//               </BodyText>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Multiple images: carousel view with dynamic styling.
//         <div className="image-container" style={containerStyle}>
//           <div className="carousel-container" style={carouselContainerStyle}>
//             <button
//               className="arrow left"
//               style={arrowLeftStyle}
//               onClick={handlePrevious}
//             >
//               {"<"}
//             </button>
//             <div className="image-carousel" style={imageCarouselStyle}>
//               {filesArray.map((file, index) => (
//                 <div
//                   className="carousel-item"
//                   key={index}
//                   style={carouselItemStyle}
//                 >
//                   <div className="image">
//                     <img
//                       src={`${process.env.PUBLIC_URL}/images/events/${file}`}
//                       width="100%"
//                       alt={Array.isArray(captions) ? captions[index] : captions}
//                     />
//                     <div className="image-caption">
//                       <BodyText>
//                         {Array.isArray(captions) ? captions[index] : captions}
//                       </BodyText>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="arrow right"
//               style={arrowRightStyle}
//               onClick={handleNext}
//             >
//               {">"}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };



// Usage: <ArticleImage files={["sem1.jpg", "sem2.jpg", "sem3.jpg"]} captions={["Caption for sem1.jpg", "Caption for sem2.jpg", "Caption for sem3.jpg"]}/>
// or
// <ArticleImagefiles="singleImage.jpg" captions="Caption for singleImage.jpg"/>

// export default ArticleImage;


import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';

const ArticleImage = ({file, caption}) => {

    return (
        <div className="image-container">
            <div className="image">
                <img
                    src={`${process.env.PUBLIC_URL}/images/events/${file}`}
                    width="100%"
                />
                <div className="image-caption">
                    <BodyText>
                        {caption}
                    </BodyText>
                </div>
            </div>
        </div>
    )
};

export default ArticleImage;