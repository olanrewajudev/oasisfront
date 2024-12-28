 import notfound from '../../assets/404.jpg'
const NotFound = () => {
  return (
    <div>
      <div className="flex items-center  justify-center"> <img src={notfound} alt="" className="h-screen w-full overflow-hidden object-cover" /> </div>
    </div>
  )
}

export default NotFound
