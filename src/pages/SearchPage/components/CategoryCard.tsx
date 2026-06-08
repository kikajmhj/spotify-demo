
import { useNavigate } from "react-router";
import { Category } from "../../../configs/categories";
import { Box, Typography } from "@mui/material";



const CategoryCard = ({ category }: { category: Category }) => {

    const navigate = useNavigate();

    return (

        <Box
            onClick = {() => navigate(`/search/${category.name}`)}
            sx = {
                {
                    position: "relative",
                    bgcolor: category.color,
                    borderRadius: "8px",
                    p:2, height:120, cursor: "pointer", overflow: "hidden",
                    "&:hover": {filter:"brightness(1.1)"}
                }
            }
        >

            <Typography variant="h2" sx= {{ fontWeight:700, color:"#fff"}}>
                {category.name}
            </Typography>

            <Box
                sx={{
                    position: "absolute",
                    bottom: -10,
                    right: -4,
                    fontSize: 72,
                    transform: "rotate(25deg)",
                    opacity: 0.85,
                    userSelect: "none",
                }}
            >
                {category.icon}
            </Box>

        </Box>

    );
 

};

export default CategoryCard;