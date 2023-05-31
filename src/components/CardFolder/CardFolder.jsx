import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgFolder from '../../../public/image/icon-folder.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardFolder = () => {
    return (

        <Card elevation={0} sx={{ maxWidth: 200, minHeight: 170, borderRadius: 2.5, margin: 10, border: '2px solid #f5f5f5' }}>
            <div style={{ paddingTop: 20, display: "flex" }}>
                <CardMedia
                    component="img"
                    alt="img-folder"
                    height="77"
                    image={imgFolder}
                    style={{ paddingLeft: 15, width: 77 }}
                />
                <MoreHorizIcon style={{ marginLeft: 70, color: '#E0E0E0', fontSize: 28 }} />
            </div>
            <CardContent>
                <Typography style={{ fontSize: 14 }} gutterBottom variant="h6" component="div">
                    Matematika Dasar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widesp
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardFolder