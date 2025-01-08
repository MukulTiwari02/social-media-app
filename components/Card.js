
const Card = ({children, fixed=false, noPadding=false}) => {
  return (
    <div className={(noPadding?"": "p-4")+(fixed ? "fixed" : "")+" bg-white shadow-md shadow-gray-300 rounded-md mb-5 "}>
        {children}
    </div>
  )
}

export default Card