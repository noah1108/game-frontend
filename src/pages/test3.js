const Test3 = () => {
  return (
    <>
      <div>console.log("test")</div>
      <div>{console.log('msg')}</div>
      <div>
        {(() => {
          const msg = 'test msg '
          console.log(msg)
          return <p>{msg}</p>
        })()}
      </div>
      <div>
        {(() => (
          <p>msg</p>
        ))()}
      </div>
    </>
  )
}

export default Test3
