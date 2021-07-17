import { Header } from "../../components"

export const MainLayout: React.FC = (props) => {
    return <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-grow">{props.children}</div>
        <div className="mt-auto">footer</div>
    </div>
}