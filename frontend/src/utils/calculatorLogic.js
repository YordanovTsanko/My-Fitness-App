export const calculatorLogic = (age, gender, height, weight, activity) => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    let activityFactor;
    switch (activity) {
      case "Sedentary: little or no exercise":
        activityFactor = 1.2;
        break;
      case "Light: exercise 1-3 times/week":
        activityFactor = 1.375;
        break;
      case "Active: daily exercise or intense exercise 3-4 times/week":
        activityFactor = 1.55;
        break;
      case "Moderate: exercise 4-5 times/week":
        activityFactor = 1.725;
        break;
      case "Very Active: intense exercise 6-7 times/week":
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2;
    }
  
    const dailyCalories = Math.round(bmr * activityFactor);
  
 
    const calorieGoals = {
      maintain: {
        label: "Maintain weight",
        calories: dailyCalories,
        percentage: "100%",
      },
      mildWeightLoss: {
        label: "Mild weight loss (0.25 kg/week)",
        calories: Math.round(dailyCalories * 0.9),
        percentage: "90%",
      },
      weightLoss: {
        label: "Weight loss (0.5 kg/week)",
        calories: Math.round(dailyCalories * 0.79), 
        percentage: "79%",
      },
      extremeWeightLoss: {
        label: "Extreme weight loss (1 kg/week)",
        calories: Math.round(dailyCalories * 0.59), 
        percentage: "59%",
      }
    };
  
    return calorieGoals;
  };
  