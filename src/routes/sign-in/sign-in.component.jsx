import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        creatUserDocumentFromAuth(user);
    }
    return (
      <div>
          <h1>Sign In page</h1>
          <button onClick={logGoogleUser}>
              Sign in with Google Popup
          </button>
      </div>
    )
  }

export default SignIn;