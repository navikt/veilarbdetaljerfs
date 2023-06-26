// import  Oversikt  from "./components/oversikt"
import Overblikk from "./components/overblikk"
import StoreProvider from "./stores/store-provider";

export interface AppProps {
	fnr: string;
	enhet?: string;
}

const App = (props: AppProps) => {

  return (
    <main className="app veilarbdetaljerfs">
			<StoreProvider fnr={props.fnr}>
					<Overblikk />
			</StoreProvider>
		</main>
    
  )
}

export default App
