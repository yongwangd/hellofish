import React from 'react';
import {Card} from 'antd';
import SearchHighlight from '../../../commonCmps/SearchHighlight';
import {Col, Row, Popover, Button, message} from 'antd';
import ColorList from './ColorList';
import colors from '../../../properties/cardColors';
import {updateContactById} from '../../../store/contactsQuery';

const columns = [

	{
		key: 'name',
		label: 'Name',
		notShow: true
	},
	{
		key: 'email',
		label: 'Email',
	},
	{
		key: 'phone',
		label: 'Phone',
	},
	{
		key: 'address',
		label: 'Address',
	},
	{
		key: 'company',
		label: 'Company',
	},
	{
		key: 'website',
		label: 'Website'
	},
	{
		key: 'instagram',
		label: 'Instagram'
	}, {
		key: 'facebook',
		label: 'Facebook'
	}, {
		key: 'comments',
		label: 'Comments'
	}
];

class ContactCard extends React.Component{
	constructor(props) {
		super(props);
		this.setContactColor = this.setContactColor.bind(this);
		
		
	}

	setContactColor(colorId) {
		const { _id } = this.props.info;
		updateContactById(_id, { color: colorId }).then(r => {
			console.log('updated collor', r);
			message.success('Color Updated');
		})


	}
	render() {
		const { info, search, onEditClick } = this.props;
		const { setContactColor } = this;
		// const { name, age, email, phone, search} = props;
		const { name, color='white', ...rest } = info;
		const colorObj = colors.find(c => c.id == color);

		console.log('info and color', info, color, colors);
		const nameTitle = <p><SearchHighlight search={search} value={name} /></p>;

		console.log('search in cars', search);

		const renderRow = (label, value) => (
			<div key={label}>
				<p style={{ fontWeight: 'bold', fontSize: 12, color: colorObj.titleColor||'#AAAAAA' }}>{label}</p>
				<span style={{ color:colorObj.font}}>
					<SearchHighlight search={search} value={value} />
				</span>
			</div>
		);

		const colorBox = (
			<div style={{ width: 250 }}>
				<ColorList activeColorId={info.color} onColorSelect={c=>setContactColor(c.id)} colors={colors} />
			</div>
		)

		const extra = ( 
			<span>
				<a onClick={() => onEditClick(info)}>Edit</a>
				<Popover placement="bottomRight" content={colorBox} trigger="hover">
					<Button>me</Button>
			</Popover>
			</span>
		);


		return (
			<Card style={{backgroundColor:colorObj.value, margin:5}} title={nameTitle} extra={extra}  className="contact-card">

			{colorBox}	

				<Row >
					<Col  className="card-text">
						{
							columns.filter(c => !c.notShow && info[c.key]!=null && info[c.key]!='').map(c => renderRow(c.label, info[c.key]))
						}
					</Col>
				</Row>
				{
					info.downloadURL &&
					<img style={{ width: '100%', marginTop:10 }} src={info.downloadURL}/>
				}


		</Card>
		);

	}
}


export default ContactCard;



