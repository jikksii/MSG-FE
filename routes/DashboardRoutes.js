import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Address book',
		icon: 'book',
		link: '/book'
	},
	{
		id: uuid(),
		title: 'SMS',
		icon: 'message-square',
		children: [
			{ id: uuid(), link: '/sms/message', name: 'Create Batch Messages' },
			{ id: uuid(), link: '/sms/queue', name: 'Queue' },
			{ id: uuid(), link: '/pages/settings', name: 'Batch Messages Archive'},
			{ id: uuid(), link: '/sms/routines', name: 'Batch Messages Routines'},
			// { id: uuid(), link: '/pages/pricing', name: 'Inbox'},
			// { id: uuid(), link: '/pages/pricing', name: 'Blocked Numbers' }
		]
	},

	{
		id: uuid(),
		title: 'Settings',
		icon: 'settings',
		children: [
			// { id: uuid(), link: '/pages/profile', name: 'API Tokens' },
			// { id: uuid(), link: '/pages/billing', name: 'Numbers'},
			// { id: uuid(), link: '/pages/pricing', name: 'Triggers'},
			// { id: uuid(), link: '/components/modal', name: 'Retail Price list'},
			{ id: uuid(), link: '/settings/profile', name: 'Profile'},
			// { id: uuid(), link: '/components/cards', name: 'System Messages'},
		]
	},
];

export default DashboardMenu;
