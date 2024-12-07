import React from 'react';
import '../styles/nutrition.css'

const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <h2>Valor Nutricional de las Galletas PowerCookies</h2>
      <table className="nutrition-table">
        <thead>
          <tr>
            <th>Nutriente</th>
            <th>Porción (100g)</th>
            <th>Porción (1 galleta)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calorías</td>
            <td>450 kcal</td>
            <td>50 kcal</td>
          </tr>
          <tr>
            <td>Proteínas</td>
            <td>8g</td>
            <td>1g</td>
          </tr>
          <tr>
            <td>Carbohidratos</td>
            <td>65g</td>
            <td>7g</td>
          </tr>
          <tr>
            <td>Grasas</td>
            <td>20g</td>
            <td>2g</td>
          </tr>
          <tr>
            <td>Fibra</td>
            <td>5g</td>
            <td>0.5g</td>
          </tr>
          <tr>
            <td>Azúcares</td>
            <td>10g</td>
            <td>1g</td>
          </tr>
        </tbody>
      </table>

      <h2>Ingredientes de las Galletas PowerCookies</h2>
      <table className="nutrition-table">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Harina de trigo</td>
            <td>100g</td>
          </tr>
          <tr>
            <td>Proteína en polvo</td>
            <td>5g</td>
          </tr>
          <tr>
            <td>Maicena</td>
            <td>5g</td>
          </tr>
          <tr>
            <td>Mantequilla</td>
            <td>5g</td>
          </tr>
          <tr>
            <td>Splenda</td>
            <td>2g</td>
          </tr>
          <tr>
            <td>Huevo</td>
            <td>2 unidades</td>
          </tr>
          <tr>
            <td>Extracto de vainilla</td>
            <td>Al gusto</td>
          </tr>
          <tr>
            <td>Chips de chocolate</td>
            <td>Al gusto</td>
          </tr>
          <tr>
            <td>Banano</td>
            <td>1 unidad</td>
          </tr>
          <tr>
            <td>Polvo de hornear</td>
            <td>Al gusto</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Nutrition;
