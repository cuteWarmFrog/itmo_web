<%--
  Created by IntelliJ IDEA.
  User: livshits
  Date: 08.11.2020
  Time: 19:53
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<body>
    <table>
        <tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Result</td>
            <td>Time</td>
        </tr>
        <c:forEach var="node" items="${sessionScope.recordKeeper.results}">
          <tr>
              <td>${node.x}</td>
              <td>${node.y}</td>
              <td>${node.r}</td>
              <td>${node.hit}</td>
              <td>${node.time}</td>
          </tr>
        </c:forEach>
    </table>
</body>
</html>
