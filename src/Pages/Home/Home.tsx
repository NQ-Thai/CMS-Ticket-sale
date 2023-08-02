import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

function Home() {
    return (
        <div>
            <Layout className="layout-content" style={{ backgroundColor: '#FFFFFF' }}>
                <Content>
                    <div className="content">Thống kê</div>
                </Content>
            </Layout>
        </div>
    );
}

export default Home;
