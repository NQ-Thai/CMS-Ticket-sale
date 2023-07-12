import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';

function Home() {
    return (
        <>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="content">Hello</Content>
                </Layout>
            </Layout>
        </>
    );
}

export default Home;
