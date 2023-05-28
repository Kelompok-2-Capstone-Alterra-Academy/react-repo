import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgVideo from '../assets/video.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardFile = () => {
    return (

        <Card sx={{ maxWidth: 200, minHeight: 170, borderRadius: 2.5, margin: 10 }}>
            <MoreHorizIcon style={{ paddingLeft: 145, color: '#E0E0E0', fontSize: 35 }} />
            <CardMedia
                component="img"
                alt="img-folder"
                height="124"
                image={imgVideo}
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto', width: 134
                }}
            />
            <hr style={{ width: 135, alignItems: 'center', marginLeft: 30 }} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Matematika Dasar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widesp
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardFile