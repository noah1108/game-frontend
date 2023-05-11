import dynamic from 'next/dynamic'
import styled from '@emotion/styled'

// react-konvaを使用しているコンポーネントはdynamic importを利用する
const ThreeCellGame = dynamic(() => import('../containers/ThreeCellGame'), {
  ssr: false,
})

// これだと、エラーになる Error: Must use import to load ES Module...
// import StageComponent from '../components/StageComponent'

const CanvasPage = () => {
  return (
    <div>
      <ThreeCellGame />
    </div>
  )
}

export default CanvasPage
