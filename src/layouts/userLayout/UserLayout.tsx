
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
export const UserLayout: React.FC = (props) => {
    return <Layout>
        <Header></Header>
        <Content>
            <div>歡迎加入！</div>
            <div>{props.children}</div>
        </Content>
        <Footer></Footer>
    </Layout>
}