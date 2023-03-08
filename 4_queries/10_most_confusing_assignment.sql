SELECT ass.id, ass.name, ass.day, ass.chapter, COUNT(ass_req.*) AS total_requests
FROM assignments ass
JOIN assistance_requests ass_req
ON ass.id = ass_req.assignment_id
GROUP BY ass.id, ass.name, ass.day, ass.chapter
ORDER BY total_requests DESC;
