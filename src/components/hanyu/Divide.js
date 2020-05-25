import React,{useState, useEffect, useRef} from 'react';
import {useDynamicList, useRequest, useDrop, useDrag} from "@umijs/hooks";
import {reqHanyuSearchlist} from "../../utils/ReqLibs";
import * as _ from "lodash";

function Divide(props){
  const [result, setResult] = useState({});
  const [keyword, setKeyword] = useState('表示性情的词语');
  const [filters, setFilters] = useState({});
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
    searchListReq.run(keyword, pageNum.current, filters);
  }, []);

  const getDragProps = useDrag();  // 可以传参数content
  const [groupName, setGroupName] = useState('');
  const groups = useDynamicList([]);
  const pageNum = useRef(1);
  const [dropProps] = useDrop({
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
      // sid 是数组的
      let targetIndex = searchList.list.findIndex(e => e.sid.join() === content.sid);
      let target = searchList.list[targetIndex];
      if(content.groupName){
        let conetntGroupIndex = groups.list.findIndex(e => e.groupName === content.groupName);
        let contentGroup = groups.list[conetntGroupIndex];
        contentGroup.list = contentGroup.list.filter(e => e.sid.join() !== content.sid);
        groups.replace(conetntGroupIndex, contentGroup);
      }else{
        searchList.replace(targetIndex, {
          ...target,
          moved: true
        });
      }
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
      <div
        style={{
          display: "flex"
        }}
      >
      {
        groups.list.map(group => {
          return (
            <div 
              style={{
                margin: 5
              }}
            >
              <div 
                style={{
                  width: "300px",
                  padding: 5,
                  backgroundColor: "#FC8181",
                  color: "#E2E8F0"
                }}
              >
                {group.groupName}
              </div>
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
                        style={{
                          width: "100%",
                          margin: 5,
                          backgroundColor: "#FEEBC8",
                          color: "#975A16"
                        }}
                        groupName={group.groupName}
                       {...getDragProps({
                          sid: item.sid.join(''),
                          groupName: group.groupName
                        })
                      }
                      >
                        {item.name.join()}
                      </div>
                      )
                    })
                  ) : "空"
                }
              </div>
            </div>
          )
        })
      }
      </div>

      <div>
        <label>关键字: </label>
        <input 
          style={{
            paddingLeft: 5,
            paddingRight: 5
          }}
          type="text" 
          value={keyword}
          onChange={
            (e) => {
              setKeyword(e.currentTarget.value);
            }
          }
          onKeyPress={
            (e) => {
              if("Enter" === e.key){
                pageNum.current = 1;
                searchListReq.run(keyword, pageNum.current, filters);
              }
              
            }
          }
        />
        <a 
          style={{
            cursor: "pointer"
          }}
          onClick={() => {
            if(pageNum.current < result.extra['total-page'] ){
              pageNum.current++;
              searchListReq.run(keyword, pageNum.current, filters);
            }else{
              alert('最后一页了');
            }
          }} 
        >下一页</a>
      </div>
      <div
        style={{
          display: "flex",
          width: "1000px",
          flexWrap: "wrap",
          marginTop: 8,
        }}
      >
        {searchList.list.filter(e => !e.moved)
          .map((e, i) => (
            <div
              {...getDragProps({
                  sid: e.sid.join('')
                })
              }
              style={{
                border: '1px solid #e8e8e8',
                padding: 10,
                width: 100,
                height: 40,
                textAlign: 'center',
                marginRight: 16,
                marginTop: 5
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