import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/Check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));
            process(req, resp, x, y, r);
        } catch (NumberFormatException e) {
            PrintWriter writer = resp.getWriter();
            writer.println("Are you happy now, you sick bastard?!");
        }

    }

    private void process(HttpServletRequest req, HttpServletResponse resp, double x, double y, double r) throws ServletException, IOException {
        boolean limited = Boolean.parseBoolean(req.getParameter("limited"));

        boolean isHit;
        long time = System.currentTimeMillis();

        if(limited) {
            if(checkX(x) && checkY(y) &&  checkR(r)) {
                isHit = checkIfHit(x, y, r);
                makeRecord(x, y, r, isHit, time, getRecordKeeper(req));
                getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
            }
        } else {
            isHit = checkIfHit(x, y, r);
            makeRecord(x, y, r, isHit, time, getRecordKeeper(req));
            getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
        }
    }

    private boolean checkIfHit(double x, double y, double r) {
        return
                x >= 0 && x <= r && y <= 0 && y >= -r ||
                x >= -r && x <= 0 && y <= 0  && y >= -r && x*x + y*y <= r*r ||
                x >= 0 && x <= r/2 && y <= r - x && y >= 0;             // y = 2 - x
    }

    private void makeRecord(double x, double y, double r, boolean isHit, long time, RecordKeeper recordKeeper) {
        time = System.currentTimeMillis() - time;
        recordKeeper.addNode(x, y, r, isHit, time);
    }

    private RecordKeeper getRecordKeeper(HttpServletRequest req) {
        if(req.getSession().getAttribute("recordKeeper") == null) {
            req.getSession().setAttribute("recordKeeper", new RecordKeeper());
        }

        return (RecordKeeper) req.getSession().getAttribute("recordKeeper");
    }

    private boolean checkX(Double x) {
        return x >= -5 && x <= 3;
    }

    private boolean checkY(Double y) {
        return y == -5 || y == -4 || y == -3 || y == -2 || y == -1 || y == 0 || y == 1 || y == 2 || y == 3;
    }

    private boolean checkR(Double r) {
        return  r == 1 || r == 1.5 || r == 2 || r == 2.5 || r == 3;
    }

}
