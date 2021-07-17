import styles from './Header.module.scss';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const Header: React.FC = () => {
    const history = useHistory();
    return <div className={`${styles.header}`}>
        <Button icon={<MenuOutlined />} style={{marginLeft:16}} onClick={()=> history.push('/')}></Button>
    </div>
}