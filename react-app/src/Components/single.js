export const Div = () => {
  return <div>I am the singleton! {Math.floor(Math.random() * 99999)}</div>
}

const ret = (function() {
  return Div()
})()

export default ret