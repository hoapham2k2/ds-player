import TestHome from '../pages/TestHome'
import RecommendPreview from './RecommendPreview'
import WebCamRecord from './WebCamRecord'

export const  SlideShow = ({ handleDetection, peopleDetected, maleCount, femaleCount }) => {
  const handleRenderContent = () => {
    if (peopleDetected) {
      if (maleCount > femaleCount) {
        return <RecommendPreview gender={'male'} />
      } else if (femaleCount > maleCount) {
        return <RecommendPreview gender={'female'} />
      } else {
        return <RecommendPreview gender={null} />
      }
    } else {
      return <TestHome />
    }
  }

  return (
    <div className="h-full w-full">
      <div className="w-full h-full relative">
        {handleRenderContent()}
        <div className="absolute top-12 right-0 w-1/4 h-1/4">
          <WebCamRecord onDetection={handleDetection} />
        </div>
      </div>
    </div>
  )
}

export default SlideShow
