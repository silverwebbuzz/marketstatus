import '../style/PreLoader.css';
import logo from '../images/Component 42.svg';
const Loading = () => {
   
  return (
    <div id="loader_container">
       <img src={logo} alt="loader" />
    </div>
  );
};
export default Loading;