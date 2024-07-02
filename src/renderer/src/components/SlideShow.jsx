import PreviewFilePage from './PreviewFile'
import WebCamRecord from './WebCamRecord'

export const SlideShow = ({
  handleDetection,
  isModelLoaded,
  peopleDetected,
  maleCount,
  femaleCount
}) => {
  const handleRenderContent = () => {
    if (peopleDetected) {
      if (maleCount > femaleCount) {
        return <PreviewFilePage gender={'male'} />
      }
      if (femaleCount > maleCount) {
        return <PreviewFilePage gender={'female'} />
      } else {
        return <PreviewFilePage />
      }
    } else {
      return <PreviewFilePage />
    }
  }

  return (
    <div className="h-full w-full">
      <div className="w-full h-full relative ">
        {handleRenderContent()}
        <div className="absolute top-12 right-0 w-1/4 h-1/4">
          <WebCamRecord onDetection={handleDetection} />
        </div>
      </div>
    </div>
  )
}

export default SlideShow
