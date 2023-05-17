import { useNavigate,useLocation } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={ navigate } 
        location={ location }
        {...props}
        />
    );
  };
  
  return Wrapper;
};

// function withRouter (Child) {
//     return function withRouter (props) {
//          const location = useLocation();
//          const history = useHistory();
//          // other relevant props
//          return <Child {...props} history={history} location={location} />;
//    }
// }

// export {withRouter}