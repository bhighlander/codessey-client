import { Card, CardContent, List, ListItem, Typography } from '@mui/material'
import Link from '@mui/material/Link'

export const EntryCard = ({ entry }) => {


    return (
        <Card sx={{ display: 'inline-flex', width: 500, height: 100, margin: 1 }}>
            <CardContent sx={{ width: 200 }}>
            <Link href={`/entries/${entry.id}`} underline='hover'>
                <Typography>{entry.title}</Typography>
            </Link>
            <Typography>{entry.content}</Typography>
            <Typography>{entry.publication_date}</Typography>
            </CardContent>
            <CardContent>
            <Typography>Categories</Typography>
            <List sx={{
                display: 'flex',
                flexDirection: 'row',
                listStyleType: 'none',
                padding: 0,
                overflow: 'auto',
                justifyContent: 'right'
                // maxWidth: "10rem"
            }}>
                {
                    entry.categories?.map(category => <ListItem key={category.id} style={{ marginRight: '5px' }} disablePadding>{category.label}</ListItem>)
                }
            </List>
            </CardContent>
        </Card>

    )
}