import React,{useState, useEffect} from 'react';
import {useDynamicList, useRequest, useDrop, useDrag} from "@umijs/hooks";
import {reqHanyuSearchlist} from "../../utils/ReqLibs";
import * as _ from "lodash";

function Divide(props){
  const [result, setResult] = useState({});
  const searchList = useDynamicList([]);
  const searchListReq = useRequest(
    reqHanyuSearchlist,
    {
      manual: true,
      onSuccess: (data,params) => {
        console.log('data', data);
        
        searchList.resetList(data.ret_array);
        setResult(data);
      }
    }
  );
  useEffect(() => {
    searchListReq.run('路组词', 1, {
      pos: "在结尾"
    });
  }, []);
  const getDragProps = useDrag();
  const [groupName, setGroupName] = useState('');
  const [dropProps, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
    },
    onDom: (content, e) => {
      console.log('onDom',e);
      let targetIndex = searchList.list.findIndex(e => e.sid.join('') === content);
      let target = searchList.list[targetIndex];
      searchList.replace(targetIndex, {
        ...target,
        moved: true
      })
      let groupName = e.nativeEvent.target.attributes["groupname"].value;
      let groupIndex = groups.list.findIndex(e => e.groupName === groupName);
      let targetGroup = groups.list[groupIndex];
      targetGroup.list.push(target);
      groups.replace(groupIndex, {
        ...targetGroup
      });
      // alert(`custom: ${content} in ${groupName} group`);
    },
  });
  const groups = useDynamicList([]);

  let newGroup = (groupName) => {
    groups.push({
      key: groupName,
      groupName,
      list: []
    })
  }


  return (
    /**
     * {
     *    extra: object,  总实例数量: entity-num, 返回数量：return-num, 总页数: total-page
     *   filters: [],
     *   hightlight: "" 高亮字
     *   recommend_words: []  热搜字词
     *   ret_array: []  返回的搜索结果
     *   ret_num: number 总实例数量
     *   ret_type: string 返回类型
     *   tag: object 标签
     * }
     */
    <>
      
      <div>
        <label>添加分组：</label>
        <input type="text" 
          value={groupName}
          onChange={
            (e) => {
              setGroupName(e.currentTarget.value);
            }
          }
          onKeyPress={
            (e) => {
              if("Enter" === e.key){
                newGroup(groupName);
                setGroupName('');
              }
              
            }
        } />
      </div>
      {
        groups.list.map(group => {
          return (
            <div
              style={{
                border: '1px dashed #e8e8e8',
                padding: 16,
                textAlign: 'center',
                overflowY: "auto",
                width: "300px",
                height: '300px',
              }}
              groupName={group.groupName}
              {...dropProps}
            >
              {
                group.list.length?  
                (
                  group.list.map((item, itemIndex) => {
                    return (
                    <div 
                      className="bg-blue-100"
                      style={{width: "120px"}}
                      groupName={group.groupName}
                    >
                      {item.name.join()}
                    </div>
                    )
                  })
                ) : "空"
              }
            </div>
          )
        })
      }

      <div
        style={{
          overflowY: "auto",
          width: "300px",
          height: '80vh',
          marginTop: 8,
        }}
      >
        {searchList.list.filter(e => !e.moved)
          .map((e, i) => (
            <div
              {...getDragProps(e.sid.join(''))}
              style={{
                border: '1px solid #e8e8e8',
                padding: 16,
                width: 80,
                textAlign: 'center',
                marginRight: 16
              }}
            >
              {e.name.join('')}
            </div>
          ))}
      </div>
    </>
  );
}

export default Divide;