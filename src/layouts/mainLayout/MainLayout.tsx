import { Header } from "../../components"

export const MainLayout: React.FC = (props) => {
    return <>
        <Header/>
        <div>{props.children}</div>
    </>
}