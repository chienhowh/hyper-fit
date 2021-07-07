import styles from './Header.module.scss';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const Header: React.FC = () => {
    return <div className={`${styles.header}`}>
        <Button icon={<MenuOutlined />} style={{marginLeft:16}}></Button>
    </div>
}