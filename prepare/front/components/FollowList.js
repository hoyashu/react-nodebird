import { DeleteTwoTone } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

function FollowList({ header, data }) {
  const loadMoreStyle = useMemo(
    () => ({
      textAlign: 'center',
      marginTop: 12,
      height: 32,
      lineHeight: '32px',
    }),
    [],
  );

  const loadMore = (
    <div style={loadMoreStyle}>
      <Button>loading more</Button>
    </div>
  );
  return (
    <List
      header={header}
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={data}
      renderItem={item => (
        <List.Item actions={[<DeleteTwoTone />]}>
          <List.Item.Meta
            avatar={<Avatar src={item.picture} />}
            title={<a href="https://ant.design">{item.nickName}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
}
FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
export default FollowList;
