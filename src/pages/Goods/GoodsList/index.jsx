import { intl } from "@chaoswise/intl";
import React, { useEffect, useState, useCallback } from "react";
import { CWTable as Table, Input, Button, Tooltip, Popconfirm, Modal, Icon ,Form, FormItemWrapper} from "@chaoswise/ui";
import GetAuth from "@/components/GetAuth";
import { observer, toJS } from "@chaoswise/cw-mobx";
import store from "@/stores/goodsStore";


import style from "./index.less";

const GoodsList = observer(() => {
	const { getList, listData } = store;
	const { current = 1, total = 0, records = [], size = 10 } = listData;

    const [loading, setLoading] = useState(false);


    //获取新增表单的数据
    const [formData, setFormData] = useState({
        carId: '',
        brand: '',
        color: '',
        price: '',
        productionDate: '',
        model: '',
    });

    //新增modal部分
    const [visible, setVisible] = useState(false);
    const showaddModal = () => {
        setVisible(true);
    }
    const handleClose = () => {
        setVisible(false);
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (formnewdata) => {
        console.log("提交的内容", formData);
        store.added(formnewdata=formData);
        getGoodsList();
        setVisible(false);
    }


//获取修改表单的数据
    const [formUpData, setFormUpData] = useState({
        carId: '666',
        brand: '666',
        color: '666',
        price: '666',
        productionDate: '666',
        model: '666',
    });

    //修改modal部分
    const [visibleUp, setVisibleUp] = useState(false);
    const showModalUp = () => {
        setVisibleUp(true);
    }
    const handleCloseUp = () => {
        setVisibleUp(false);
    }

    const handleInputChangeUp = (event) => {
        setFormUpData({
            ...formUpData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmitUp = (formdataup) => {
        console.log("提交的内容", formUpData);
        store.added(formdataup=formUpData);
        getGoodsList();
        setVisibleUp(false);
    }


	const columns = [
		{
			title: "编号",
			dataIndex: "carId",
			key: "carId",
			render: (text) => {
				return (
                    //气泡提示
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		{
			title: "品牌",
			dataIndex: "brand",
			key: "brand",
            render: (text) => {
				return (
                    //气泡提示
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "颜色",
			dataIndex: "color",
			key: "color",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "单价(k)",
			dataIndex: "price",
			key: "price",
			sorter: (a, b) => a.level - b.level,
			sortDirections: ["descend", "ascend", undefined],
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		{
			title: "生产日期",
			dataIndex: "productionDate",
			key: "productionDate",
			sorter: (a, b) => a.productionDate - b.productionDate,
			sortDirections: ["descend", "ascend", undefined],
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "型号",
			dataIndex: "model",
			key: "model",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
		{
			title: "创建人",
			dataIndex: "createdName",
			key: "createdName",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "创建时间",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
			title: "修改时间",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (text) => {
				return (
					<Tooltip
						title={text}
						placement="topLeft">
						<div className={style["table-content"]}>{text}</div>
					</Tooltip>
				);
			},
		},
        {
            title: "操作",
            dataIndex: "actions",
            keys: "actions",
            render:(text,record) => {
                // console.log("recordrender===>",record);
                return (
                    <>
                    <Button
                        type="primary"
                        onClick={showModalUp}
                        style={{marginRight: 10}}>
                            修改
                    </Button>
                    <Popconfirm
                        title="确定删除该商品吗？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => {
                            console.log("recordbutton===>",record);
                            deleteClick(record);
                        }}>
                            <Button type="danger" >删除</Button>
                    </Popconfirm>
                </>
                )
            }
        }
	];
//删除按钮部分
    function deleteClick(record) {
        console.log("record===>",record);
        let deleteIdmsg=store.deleted(record.carId);
        console.log(deleteIdmsg);
        getGoodsList();
    }
//获取数据部分
	const getGoodsList = useCallback(
		async (params = {}) => {
			setLoading(true);
			await getList(params);
			setLoading(false);
		},
		[getList]
	);

	useEffect(() => {
		getGoodsList({
			current: current,
			size: size,
		});
	}, [getGoodsList, current, size]);

	const onSearch = (searchParams, current, size) => {
		getGoodsList({
			current: current,
			size: size,
			...searchParams,
		});
	};

	const changePage = (current, size, searchParams) => {
		getGoodsList({
			current,
			size: size,
			...searchParams,
		});
	};

	const searchContent = () => {
		return [
			{
				components: (
                        <Input
                            id="searchinput"
                            key="searchinput"
                            placeholder={"输入搜索内容"}
                            name={"搜索框"}
                            allowClear
                        />
				),
				showLabel: true,
			},
		];
	};



	return (
		<div className={style["goods"]}>
			<Table
				autoHeight={true}
				loading={loading}
				columns={columns}
				scroll={{ x: 1300 }}
				dataSource={toJS(records)}
				pagination={{
					pageSize: size,
					currentPage: current,
					total: total,
					onChange: changePage,
					onShowSizeChange: changePage,
					showSizeChanger: true,
				}}
				searchBar={{
					onSearch: onSearch,
					extra: () => {
						return [
                            <>
                                <Button
                                    onClick={showaddModal}
                                    type="primary">
                                    {"新增商品"}
                                </Button>
                                <GetAuth
                                    key="Export"
                                    code="1054102401"
                                    render={(hasAuth) => (
                                        <Button
                                            type="primary"
                                            disabled={!hasAuth}>
                                            {"导出"}
                                        </Button>
                                    )}
                                />
                            </>
						];
					},
					searchContent: searchContent(intl),
				}}
			/>
            <Modal
                title="填写表单"
                visible={visible}
                onCancel={handleClose}
                footer={null}
            >
                <Form
                    layout="vertical"
                >
{/* car_id */}
                    <Form.Item
                        label="商品id"
                        help={formData.carId.length > 0 ? "" : "请输入商品id"}
                        validateStatus={formData.carId.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品id，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="商品id是唯一的数字，请不要重复">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="carId"
                                value={formData.carId}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 品牌 */}
                    <Form.Item
                        label="品牌"
                        help={formData.brand.length > 0 ? "" : "请输入商品品牌"}
                        validateStatus={formData.brand.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写品牌"
                            iconOption={{
                                icon:
                                <Tooltip title="品牌是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="brand"
                                value={formData.brand}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 商品颜色 */}
                    <Form.Item
                        label="商品颜色"
                        help={formData.color.length > 0 ? "" : "请输入商品颜色"}
                        validateStatus={formData.color.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品颜色"
                            iconOption={{
                                icon:
                                <Tooltip title="商品颜色是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="color"
                                value={formData.color}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* danjia */}
                    <Form.Item
                        label="商品单价（k)"
                        help={formData.price.length > 0 ? "" : "请输入单价"}
                        validateStatus={formData.price.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品单价（k)"
                            iconOption={{
                                icon:
                                <Tooltip title="商品单价单位是千元">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="price"
                                value={formData.price}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 生产日期 */}
                    <Form.Item
                        label="生产日期"
                        help={formData.productionDate.length > 0 ? "" : "请输入生产日期"}
                        validateStatus={formData.productionDate.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写生产日期"
                            iconOption={{
                                icon:
                                <Tooltip title="生产日期是时间">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="productionDate"
                                value={formData.productionDate}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* xinghao  */}
                    <Form.Item
                        label="商品型号"
                        help={formData.model.length > 0 ? "" : "请输入商品型号"}
                        validateStatus={formData.model.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品型号"
                            iconOption={{
                                icon:
                                <Tooltip title="商品型号是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="model"
                                value={formData.model}
                                showCount
                                onChange={handleInputChange}
                            />
                        </FormItemWrapper>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
{/* 修改商品的Modal  */}
            <Modal
                title="填写表单"
                visible={visibleUp}
                onCancel={handleCloseUp}
                footer={null}
            >
                <Form
                    layout="vertical"
                >
{/* car_id */}
                    <Form.Item
                        label="商品id"
                        help={formUpData.carId.length > 0 ? "" : "请输入商品id"}
                        validateStatus={formUpData.carId.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品id，请不要重复"
                            iconOption={{
                                icon:
                                <Tooltip title="商品id是唯一的数字，请不要重复">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="carId"
                                value={formUpData.carId}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 品牌 */}
                    <Form.Item
                        label="品牌"
                        help={formUpData.brand.length > 0 ? "" : "请输入商品品牌"}
                        validateStatus={formUpData.brand.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写品牌"
                            iconOption={{
                                icon:
                                <Tooltip title="品牌是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="brand"
                                value={formUpData.brand}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 商品颜色 */}
                    <Form.Item
                        label="商品颜色"
                        help={formUpData.color.length > 0 ? "" : "请输入商品颜色"}
                        validateStatus={formUpData.color.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品颜色"
                            iconOption={{
                                icon:
                                <Tooltip title="商品颜色是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="color"
                                value={formUpData.color}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* danjia */}
                    <Form.Item
                        label="商品单价（k)"
                        help={formUpData.price.length > 0 ? "" : "请输入单价"}
                        validateStatus={formUpData.price.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品单价（k)"
                            iconOption={{
                                icon:
                                <Tooltip title="商品单价单位是千元">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="price"
                                value={formUpData.price}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* 生产日期 */}
                    <Form.Item
                        label="生产日期"
                        help={formUpData.productionDate.length > 0 ? "" : "请输入生产日期"}
                        validateStatus={formUpData.productionDate.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写生产日期"
                            iconOption={{
                                icon:
                                <Tooltip title="生产日期是时间">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="productionDate"
                                value={formUpData.productionDate}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
{/* xinghao  */}
                    <Form.Item
                        label="商品型号"
                        help={formUpData.model.length > 0 ? "" : "请输入商品型号"}
                        validateStatus={formUpData.model.length > 0 ? "success" : "error"}
                        required
                    >
                        <FormItemWrapper
                            placeholder="这里填写商品型号"
                            iconOption={{
                                icon:
                                <Tooltip title="商品型号是字符串">
                                    <Icon type="question-circle" />
                                </Tooltip>,
                            }}
                        >
                            <Input
                                name="model"
                                value={formUpData.model}
                                showCount
                                onChange={handleInputChangeUp}
                            />
                        </FormItemWrapper>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmitUp}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
		</div>
	);
});

export default GoodsList;
