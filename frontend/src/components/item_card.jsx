import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ItemCard({ imageSrc, title, description }) {
	// const itemContentWidth = '1130px';
	// const itemContentHeight = '200px';
	// const itemContentBackgroundColor = 'rgba(179, 218, 255, 0.08)';

	return (
		<Box
			sx={{
				display: 'flex',
				backgroundColor: 'rgba(179, 218, 255, 0.08)',
				height: '87px',
				maxWidth: '1100px',
				cursor: 'pointer',
				transition: 'background-color 0.2s ease',
				'&:hover': {
					backgroundColor: 'rgba(179, 218, 255, 0.25)'
				},
			}}
		>
			{/* Элемент вывода изображения */}
			<Box
				component='img'
				src={imageSrc}
				alt={title}
				sx={{
					width: '231px',
					height: '100%',
					objectFit: 'cover',
				}}
			/>

			{/* Контейнер для тектовых блоков */}
			<Box 
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '0 12px',
					flexGrow: 1,
					minWidth: 0,
				}}
			>
				{/* Компонент заголовка товара */}
				<Typography
					variant="h6"
					sx={{
						color: '#ffff',
						fontSize: '16px',
						fontWeight: 600,
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						lineHeight: 1.2,
					}}
				>
					{/* Вывод значения заголовка из параметров */}
					{title}
				</Typography>

				{/* Компонент описания товара */}
				<Typography
					variant='body2'
					sx={{
						color: '#acb2b8',
						fontSize: '12px',
						whiteSpace: "nowrap",
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						marginTop: '4px',
					}}
				>
					{/* Вывод значения описания из параметров */}
					{description}
				</Typography>
			</Box>
		</Box>
	);
}

export default ItemCard