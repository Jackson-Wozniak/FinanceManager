import type React from "react"
import { TransactionCategory } from "../../../types/Transaction/TransactionEnums";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SavingsIcon from "@mui/icons-material/Savings";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const TransactionCategoryIcon: React.FC<{
    category: TransactionCategory,
}> = ({category}) => {

    if(category == null) return <></>

    let IconComponent;
    let color;

    switch (category) {
        case TransactionCategory.Income:
            IconComponent = AttachMoneyIcon;
            color = "rgba(10, 136, 25, 1)";
            break;
        case TransactionCategory.Housing:
            IconComponent = HomeIcon;
            color = "rgba(32, 32, 241, 1)";
            break;
        case TransactionCategory.Utilities:
            IconComponent = LocalGasStationIcon;
            color = "rgba(68, 68, 68, 1)";
            break;
        case TransactionCategory.Transportation:
            IconComponent = DirectionsCarIcon;
            color = "rgba(185, 34, 165, 1)";
            break;
        case TransactionCategory.Food:
            IconComponent = FastfoodIcon;
            color = "rgba(236, 222, 58, 1)";
            break;
        case TransactionCategory.Health:
            IconComponent = LocalHospitalIcon;
            color = "rgba(186, 21, 21, 1)";
            break;
        case TransactionCategory.Insurance:
            IconComponent = CreditCardIcon;
            color = "rgba(46, 211, 226, 1)";
            break;
        case TransactionCategory.Debt:
            IconComponent = CreditCardIcon;
            color = "rgba(191, 84, 17, 1)";
            break;
        case TransactionCategory.Savings:
            IconComponent = SavingsIcon;
            color = "rgba(39, 244, 62, 1)";
            break;
        case TransactionCategory.Entertainment:
            IconComponent = SportsEsportsIcon;
            color = "rgba(118, 87, 214, 1)";
            break;
        case TransactionCategory.Subscription:
            IconComponent = SubscriptionsIcon;
            color = "rgba(100, 255, 165, 1)";
            break;
        case TransactionCategory.Personal:
            IconComponent = PersonIcon;
            color = "rgba(85, 144, 92, 1)";
            break;
        case TransactionCategory.Misc:
            IconComponent = MoreHorizIcon;
            color = "rgba(124, 124, 124, 1)";
            break;
        default:
            IconComponent = MoreHorizIcon;
  }

  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1,
        backgroundColor: color,
        color: "white",
      }}
    >
      <IconComponent />
    </IconButton>
  );
}

export default TransactionCategoryIcon;