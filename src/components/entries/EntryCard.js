import { Box, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import Link from '@mui/material/Link'

export const EntryCard = ({ entry }) => {


    return (
        <Box>
        <Card sx={{ display: 'inline-flex', width: 500, margin: 1 }}>
            <CardContent sx={{ width: 200 }}>
            <Link href={`/entries/${entry.id}`} underline='hover'>
                <Typography variant='h6'>{entry.title}</Typography>
            </Link>
            <Typography variant='body1' style={{ whiteSpace: "pre-wrap" }}>{entry.content}</Typography>
            <Typography variant='caption'>{entry.publication_date}</Typography>
            </CardContent>
            <CardContent>
            <Typography variant='h6'>Categories</Typography>
                {entry.categories?.length > 0 ? (
                    <List sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        listStyleType: 'none',
                        padding: 0,
                        overflow: 'auto',
                        justifyContent: 'right'
                    }}>
                        {entry.categories.map(category => (
                            <ListItem key={category.id} style={{ marginRight: '5px' }} disablePadding>
                                {category.label}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant='button'>None</Typography>
                )}

            </CardContent>
        </Card>
        </Box>
    )
}